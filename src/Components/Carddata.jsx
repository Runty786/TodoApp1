import React from "react";

const Carddata = () => {
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
      <h1>Card Data File{arr.length}</h1>
    </>
  );
};
export default Carddata;
