import { useState, useEffect } from "react"

const DataDay = () => {
    const [today, setToday] = useState('');

    useEffect(() => {
      const date = new Date();
      const options = { weekday: "long", day: "numeric", month: "long" };
      const day = date.toLocaleDateString("es-ES", options);
      setToday(day);
    }, []);

  return (
    <div className="mt-7">
        <p className="text-white">
            {today}
        </p>
    </div>
  )
}

export default DataDay