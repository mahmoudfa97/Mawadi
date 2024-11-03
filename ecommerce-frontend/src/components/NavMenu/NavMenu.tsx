// NavMenu.js
import React from 'react';
const NavMenuItems = [
    { text: 'بيت', eng:"home", href: '/home' },
    { text: 'الأكثر مبيعاً', eng:"Most Selled",href: '/product/listing/best-seller' },
    { text: 'فئات', eng:"Categories",href: '/product/categories', isMenu: true},
    { text: 'مناسبات',eng:"Occasions", href: '/product/occasion', isMenu: true },
    { text: 'سحر مودة',eng:"Mawadi Magic", href: '/mawadi-magic' },
]
const NavMenu = () => {
    return (
        <ul className="flex parent justify-start items-center">
            {NavMenuItems.map((item, index) => (
                <li key={index} className={item.isMenu? "main-menu cursor-pointer py-[1.2rem] px-4 lg:px-2 xl:px-3" : "py-2 px-4 lg:px-2 xl:px-3"}>
                    <a className="text-sm xl:text-base font-customSemiBold capitalize tracking-wide text-black hover:text-themeColor duration-300 ease-in-out transform cursor-pointer" href={item.href}>
                        {item.text}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;
