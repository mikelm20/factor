import React from "react";
import { Link} from "react-router-dom";

function Videos() {

    const initialList = [];
    const [list, setList] = React.useState(initialList);

    React.useEffect(() => {
        const apiUrl = `http://127.0.0.1:5000/videos`;
        fetch(apiUrl)
        .then((res) => res.json())
        .then((list) => {
            setList(list);
        });
  }, []);

  return (
    <div className="videoList">
            {list.map((item) => 
                <div key={item.id} id="videoWrapper">
                    <h3>{item.title}</h3>
                    <p><Link to='/watch'>{item.fileName}</Link></p>
                    <button >AWS</button>
                    <button >IBM</button>
                    <button >Google</button>
                    <button >DS</button>
                    <button >Delete</button>
                </div>
            )}
    </div>
  );
}

export default Videos;