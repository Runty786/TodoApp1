import React from "react";

const Card = () => {
  const arr = [
    {
      id: 1,
      title: "Card 1",
      desc: "Card 1 Description",
    },
    {
      id: 2,
      title: "Card 2",
      desc: "Card 2 Description",
    },
  ];
  return (
    <>
      <h2>Map function</h2>
      {arr.map((val) => {
        return (
          <div className="card" key={val.id}>
            {/* <img src={val.img} alt="" /> */}
            <h3>{val.title}</h3>
            <p>{val.desc}</p>
          </div>
        );
      })}
    </>
  );
};

export default Card;
