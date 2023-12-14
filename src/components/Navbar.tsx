import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Bars3Icon
  } from "@heroicons/react/24/outline";


export default async function Navbar() {
  

  return (
    <div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <Bars3Icon className="h-8 w-8 "/>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Homepage</a></li>
          <li><a>Portfolio</a></li>
          <li><a>About</a></li>
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <a className="btn btn-ghost text-2xl font-extrabold">Lottery</a>
    </div>
    <div className="navbar-end">
     
    </div>
  </div>
  );
}