import React, {useState} from 'react';

const handleClick = (event: React.MouseEvent<HTMLLIElement>, index: 
    number) => {
     console.log(`City index: ${index}`, event);
    };
   

const ListGroup: React.FC = () => {
    const cities: string[] = ['Colombo', 'Kandy', 'Galle'];
    const  [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <>
            <h3>Available Cities</h3>
            {cities.length === 0 ? (
                <p>No cities available.</p>
        ) : (
                <ul className="list-group">
           
                {cities.map((city, index) =>(
                    <li
                        key={index} 
                        className="list-goup-item" 
                        onClick={ (e) => handleClick(e,index)}
                    >
                        {city}
                    </li>
            ))}
            </ul>
        )}
        <ul className="list-group">
            {cities.map((city, index) => (
                <li
                    key={index}
                    className={`list-group-item ${
                        selectedIndex === index ? 'active' : ''
                    }`}
                    onClick={() => setSelectedIndex(index)}

        >
            {city}
        </li>
    ))}
    </ul>
        </>
    );
};
export default ListGroup;
