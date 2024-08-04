
export default function Sidebar({ children }) {

  return (
      <nav className="h-full flex flex-col bg-purple-300">
          <ul className="flex-1 px-2 my-3">
            {children}
          </ul>
      </nav>
  );
}
export function SidebarItem({ component }) {
    
    return (
    <li className="relative flex items-center my-1 rounded-lg cursor-pointer py-2 px-2">
        <div className="w-full flex justify-start rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-black">
          {component}
        </div>
    </li>
    );
}