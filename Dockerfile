## 第一階段負責下載依賴並執行 npm run build。
## 第二階段只包含執行所需的檔案和依賴，減少映像大小。


# 第一階段：構建階段
FROM node:18-alpine AS builder
WORKDIR /app

# 複製必要檔案並安裝依賴
COPY package.json package-lock.json ./
RUN npm install

# 複製所有程式碼並構建
COPY . .
RUN npm run build

# 第二階段：執行階段
FROM node:18-alpine
WORKDIR /app

# 複製構建輸出的檔案和必要的依賴 (映像大小優化: 僅複製構建結果 (/app/.next)、套件、靜態資源，而不是完整的程式碼)
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY public /app/public

RUN npm install --production

# 暴露埠並執行應用程式
EXPOSE 3000
CMD ["npm", "start"]

