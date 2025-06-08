"use client";

interface ModalProps {
    tags: string[];
    maxTagLength: number
}

const TagList: React.FC<ModalProps> = ({ tags, maxTagLength }) => (
    <div className="flex flex-wrap gap-2">
        {tags.length > 0 && tags[0] !== "" ? tags.map((tag, index) => (
            <span
                key={index}
                className="bg-neutral-700/80 hover:bg-neutral-600/80 text-neutral-200 hover:text-white border border-neutral-600/50 hover:border-neutral-500/80 px-3 py-1.5 rounded-full text-sm font-medium inline-flex justify-center items-center transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                style={{ minWidth: `${maxTagLength * 0.8}ch` }}
            >
                {tag}
            </span>
        )) : (
            <span
                key="default"
                className="bg-neutral-700/50 text-neutral-400 px-3 py-1.5 rounded-full text-sm font-medium inline-flex justify-center items-center invisible backdrop-blur-sm"
                style={{ minWidth: `${maxTagLength * 0.8}ch` }}
            >
                default
            </span>
        )}
    </div>
);

export default TagList