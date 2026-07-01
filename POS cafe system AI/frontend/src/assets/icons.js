import { 
  FiCoffee, FiGrid, FiFileText, FiList, FiPieChart, FiUsers, FiSettings, 
  FiHelpCircle, FiLogOut, FiMenu, FiSearch, FiPrinter, FiTrash2, FiClock,
  FiRotateCcw, FiHome, FiPlus, FiMinus, FiDelete, FiXCircle, FiShoppingCart,
  FiBox, FiTag, FiCalendar, FiChevronDown, FiFilter, FiRefreshCw,
  FiDownload, FiUpload, FiChevronLeft, FiChevronRight, FiChevronsLeft,
  FiChevronsRight, FiInfo, FiSave
} from 'react-icons/fi';
import { MdOutlineFastfood, MdOutlineRamenDining, MdOutlineRiceBowl } from 'react-icons/md';
import { BiCoffeeTogo, BiFoodMenu, BiReceipt } from 'react-icons/bi';
import { BsCashCoin, BsGift, BsCupHot } from 'react-icons/bs';
import { GiCampCookingPot } from 'react-icons/gi';

export const Icons = {
  // Sidebar
  Logo: BiCoffeeTogo,
  Dashboard: FiGrid,
  Billing: BiReceipt,
  Inventory: FiBox,
  FileExcel: FiFileText,
  ItemRequest: FiFileText,
  SalesReport: FiPieChart,
  Users: FiUsers,
  Settings: FiSettings,
  Help: FiHelpCircle,
  Logout: FiLogOut,

  // Top Bar
  Menu: FiMenu,
  Search: FiSearch,
  GridMode: FiGrid,
  ListMode: FiList,
  Calendar: FiCalendar,
  Clock: FiClock,
  ChevronDown: FiChevronDown,
  Filter: FiFilter,
  Reset: FiRefreshCw,
  Download: FiDownload,
  Upload: FiUpload,
  Save: FiSave,
  Prev: FiChevronLeft,
  Next: FiChevronRight,
  First: FiChevronsLeft,
  Last: FiChevronsRight,
  Info: FiInfo,

  // Categories
  Beverage: FiCoffee,
  SteamedBun: MdOutlineFastfood,
  Dimsum: MdOutlineRiceBowl,
  DeepFry: GiCampCookingPot,
  Bake: BsCupHot,
  Noodles: MdOutlineRamenDining,
  Porridge: MdOutlineRiceBowl,
  AllItems: FiGrid,

  // Numpad & Input
  Barcode: FiList, // Placeholder
  Clear: FiDelete,
  Plus: FiPlus,
  Minus: FiMinus,

  // Actions - Purple
  NewBill: FiPlus,
  PriceAmendment: FiTag,
  GiftVoucher: BsGift,

  // Actions - Teal
  OpenCashBox: BsCashCoin,
  GoodsReturn: FiRotateCcw,
  CancelItem: FiXCircle,
  AddItem: FiShoppingCart,

  // Actions - Orange
  TerminateTransaction: FiMinus,
  Print: FiPrinter,
  ReservedTransaction: FiClock,
  DeleteAll: FiTrash2,
  Delete: FiTrash2,
  Restore: FiRotateCcw,
  MainMenu: FiHome,
};
