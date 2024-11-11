import { useTheme } from "../Context/ThemeContext"

function Footer() {
  const {theme}=useTheme();
  return (
    <div className={`mt-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>AfyaPlus @2024 All Rights Reserved</div>
  )
}

export default Footer