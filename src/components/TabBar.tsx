'use client'

import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: Props) => {
  const [selected, setSelected] = useState(currentTab)

  //Esta jalada hace que se marque el tab seleccionado, sepa como fregados lo hace, pero bueno, toca aprenderlo 
  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie('SelectedTab', tab.toString())
  }

  return (
    <div className={`
        grid w-full space-x-2 rounded-xl bg-gray-200 p-2
        grid-cols-4`
    }>
      {
        tabOptions.map(tab => (
          <div key={tab}>
            <input
              checked={selected === tab}
              onChange={() => { }}
              type="radio"
              id={tab.toString()}
              className="peer hidden"
            />
            <label onClick={() => onTabSelected(tab)} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white transition-all">{tab}</label>
          </div>
        ))
      }
    </div>
  )
}
