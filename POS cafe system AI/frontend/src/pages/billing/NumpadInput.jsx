import React from 'react';
import { Icons } from '../../assets/icons';

const NumpadInput = () => {
  const numpadKeys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'BACKSPACE'];

  return (
    <div className="bg-white rounded-[7px] h-[198px] px-[12px] py-[19px]">
      {/* Top Row */}
      <div className="flex mb-[9px] gap-[12px]">
        <div className="w-[250px]">
          <label style={{ fontSize: '11.5px' }} className="block font-semibold text-[#1e1c70] mb-[4px]">Item Number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Scan / Enter item number"
              style={{ fontSize: '12px', fontWeight: 400 }}
              className="w-full h-[28px] bg-[#fbfbfd] border border-[#f0f1f5] rounded-[5px] px-[12px] pr-[30px] text-[#1e1c70] placeholder:text-[#746c9e] focus:outline-none focus:ring-1 focus:ring-[#7435dc]"
            />
            <Icons.Barcode className="absolute right-[10px] top-[7px] text-[#1e1c70] text-[14px]" />
          </div>
        </div>

        <div className="w-[130px]">
          <span style={{ fontSize: '11.5px' }} className="block font-semibold text-[#1e1c70] mb-[3px]">Quantity</span>
          <div className="grid grid-cols-3 h-[28px] bg-[#fbfbfd] border border-[#f0f1f5] rounded-[5px] overflow-hidden">
            <button className="flex items-center justify-center text-[#1e1c70] hover:bg-gray-50">
              <Icons.Minus size={12} />
            </button>
            <span className="flex items-center justify-center text-[12px] font-normal text-[#1e1c70]">1</span>
            <button className="flex items-center justify-center text-[#1e1c70] hover:bg-gray-50">
              <Icons.Plus size={12} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end min-w-[64px]">
          <button style={{ fontSize: '12px' }} className="h-[29px] w-full bg-[#5f2eea] text-white rounded-[5px] font-semibold hover:bg-[#4d25bf]">Add</button>
        </div>
      </div>

      {/* Bottom Rows */}
      <div className="flex">
        <div className="w-[155px] space-y-[9px] shrink-0">
          <div>
            <label style={{ fontSize: '11.5px' }} className="block font-semibold text-[#1e1c70] mb-[4px]">Table No</label>
            <input
              type="text"
              placeholder="Enter table no"
              style={{ fontSize: '12px', fontWeight: 400 }}
              className="w-full h-[28px] bg-[#fbfbfd] border border-[#f0f1f5] rounded-[5px] px-[12px] text-[#1e1c70] placeholder:text-[#746c9e] focus:outline-none focus:ring-1 focus:ring-[#7435dc]"
            />
          </div>
          <div>
            <label style={{ fontSize: '11.5px' }} className="block font-semibold text-[#1e1c70] mb-[4px]">No of Cover</label>
            <input
              type="text"
              placeholder="Enter no of cover"
              style={{ fontSize: '12px', fontWeight: 400 }}
              className="w-full h-[28px] bg-[#fbfbfd] border border-[#f0f1f5] rounded-[5px] px-[12px] text-[#1e1c70] placeholder:text-[#746c9e] focus:outline-none focus:ring-1 focus:ring-[#7435dc]"
            />
          </div>
        </div>

        <div className="ml-[26px] flex-1 grid grid-cols-[1fr_64px] gap-[12px]">
          <div className="grid grid-cols-3 gap-[6px]">
            {numpadKeys.map((key) => (
              <button
                key={key}
                style={{ fontSize: '12px' }}
                className="bg-[#fbfbfd] border border-[#f0f1f5] rounded-[5px] flex items-center justify-center font-semibold text-black hover:bg-gray-50 h-[24px]"
              >
                {key === 'BACKSPACE' ? <Icons.Clear className="text-[#1e1c70] text-[13px]" /> : key}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-[6px]">
            <button style={{ fontSize: '12px' }} className="h-[29px] bg-[#5f2eea] text-white rounded-[5px] font-semibold hover:bg-[#4d25bf]">AC</button>
            <button style={{ fontSize: '12px' }} className="h-[29px] bg-[#5f2eea] text-white rounded-[5px] font-semibold hover:bg-[#4d25bf]">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumpadInput;
