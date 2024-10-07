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
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-sm inline-flex justify-center"
                style={{ minWidth: `${maxTagLength}ch` }}
            >
                {tag}
            </span>
        )) : (
            <span
                key="default"
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-sm inline-flex justify-center invisible"
                style={{ minWidth: `${maxTagLength}ch` }}
            >
                default
            </span>
        )}
    </div>
);

export default TagList