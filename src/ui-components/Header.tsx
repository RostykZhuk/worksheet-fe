import logo from "/logo.svg";

export const Header = () => (
  <header className="flex flex-col sm:flex-row items-center justify-between p-4 mb-2 shadow-md shadow-primary-500 bg-green-100" >
    <img src={logo} alt="logo" className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32" />  
    <p className="text-primary-500 text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl sm:mr-10 cursor-default">Work<span className="text-primary-400">Sheet</span></p>
  </header>
);
