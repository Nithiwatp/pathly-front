// Header.tsx
import React from "react";
import { Beaker } from "lucide-react";

const Header: React.FC = () => (
  <div className="max-w-xl mx-auto mb-12 flex items-center justify-center gap-6">
    <div className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center flex-shrink-0">
      <Beaker className="w-12 h-12 text-yellow-800" />
    </div>
    <h1 className="text-4xl font-bold">Pathly Potions</h1>
  </div>
);

export default Header;
