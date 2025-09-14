import { MdLocalPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaTshirt, FaMobileAlt, FaLaptop, FaHeadphones, FaCamera, FaPrint, FaSpeakerDeck, FaTv, FaTabletAlt } from 'react-icons/fa';

const icons = {
    MdLocalPhone,
    MdOutlineEmail,
    FaUser,
    FaBagShopping
};
export default icons;

export const categoryIcons = {
    'smartphone': FaMobileAlt,
    'tablet': FaTabletAlt,
    'laptop': FaLaptop,
    'accessories': FaHeadphones,
    'camera': FaCamera,
    'printer': FaPrint,
    'speaker': FaSpeakerDeck,
    'television': FaTv,
};
export const DefaultCategoryIcon = FaTshirt;

