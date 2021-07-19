import React from "react";
import { Link} from "react-router-dom";

function Videos() {

    const initialList = [];
    const [list, setList] = React.useState(initialList);

    React.useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_BACKEND}/videos`;
        fetch(apiUrl)
        .then((res) => res.json())
        .then((list) => {
            setList(list);
        });
  }, []);

  return (
    <div className="videoList">
            {list.map((item) => 
                <div key={item.fileName} id="videoWrapper">
                    <h3>{item.title}</h3>
                    <p><Link to={'/watch/'+item.fileName}>{item.fileName}</Link></p>
                </div>
            )}
    </div>
  );
}

export default Videos;