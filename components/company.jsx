import { useState } from "react";

const techCompanies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Adobe",
  "IBM",
  "Intel",
  "Cisco",
  "Infosys",
  "TCS"
];

const CompanyName = ({ name, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <li
      className="flex items-center justify-center flex-1 h-32 px-12"
      key={index}
    >
      <div
        className="transform transition-all duration-500 ease-in-out hover:cursor-pointer text-4xl font-bold"
        style={{
          transform: isHovered ? "rotate(360deg)" : "rotate(0deg)",
          WebkitTextStroke: '1px rgb(59, 130, 246)', // Blue stroke color to match theme
          WebkitTextFillColor: 'transparent'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
      </div>
    </li>
  );
};

const Company = ({ className }) => {
  return (
    <div className={`${className} mt-12 w-full`}>
      <h2 className="text-center text-2xl mb-6 mt-12 text-gray-600 font-semibold">
        Trusted by Leading Tech Companies
      </h2>
      
      <div className="overflow-hidden py-4">
        <ul
          className="flex animate-infinite-scroll items-center justify-around"
          style={{ minWidth: "200%" }}
        >
          {techCompanies.map((name, index) => (
            <CompanyName key={index} name={name} index={index} />
          ))}
          {techCompanies.map((name, index) => (
            <CompanyName
              key={`duplicate-${index}`}
              name={name}
              index={index}
            />
          ))}
        </ul>
      </div>
      
      <style jsx>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-infinite-scroll {
          animation: scrollRight 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Company;