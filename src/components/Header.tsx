import type { FC } from "react";

type Header = {
  name: string;
};

const Header: FC<Header> = ({ name }) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold capitalize">{name}</h1>
      <div className="flex items-center">
        <h1 className="text-xl">Log Out</h1>
      </div>
    </div>
  );
};

export default Header;
