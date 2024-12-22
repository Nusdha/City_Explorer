import React from "react";

interface ListGroupProps {
    items: { name: string; description: string}[];
    heading: string;
    onItemClick: (index: number) => void;
    selectedIndex: number | null;
}

const ListGroup: React.FC<ListGroupProps> = ({
    items,
    heading,
    onItemClick,
    selectedIndex,
}) => {
    return (
        <div>
            <h1>{heading}</h1>
            <ul className="list-group">
                {items.map((items, index) => (
                    <li
                    key={index}
                    className={`list-group-item ${selectedIndex === index ? "active" : ""}`}
                    onClick={() => onItemClick(index)}>
                        {items.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ListGroup;