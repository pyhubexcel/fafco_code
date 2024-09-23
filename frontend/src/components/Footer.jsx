import { Link, useNavigate, useLocation } from "react-router-dom";
import footerLogo from "../assets/img/footer-logo.png";
import footerUsa from "../assets/img/footer-usa.png";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const footerArray = [
  [
    { header: "PRODUCT" },
    { name: "Above-Ground Pool Heating" },
    { name: "In-Ground Pool Heating" },
    { name: "CoolPV" },
    { name: "IceStor" },
  ],
  [
    { header: "LEARN" },
    { name: "Pool Heating Basics" },
    { name: "Technologies" },
    { name: "Designing a System" },
  ],
  [
    { header: "SUPPORT" },
    { name: "FAQs" },
    { name: "Service" },
    { name: "Downloads" },
    { name: "Find a Dealer" },
  ],
];

export default function Footer() {
  let token = Cookies.get("token");
  const Navigation = useNavigate();
  const location = useLocation();
  const urlPath = location.pathname;
  const loginSliceSuccess = useSelector(
    (state) => state.LoginSlice?.data?.success
  );
  const logOutState = useSelector((state) => state.logOutSlice?.data?.success);

  useEffect(() => {
    token = Cookies.get("token");
    if (logOutState === true) {
      Cookies.remove("token");
      Cookies.remove("id");
      Cookies.remove("name");
      Cookies.remove("role");
      localStorage.removeItem("idd");
      Navigation("/login");
    }
   
  }, [loginSliceSuccess, logOutState]);

  return (
    <footer className="bg-[#005D92]">
      <div className="text-center">
        {" "}
        {/* Center-aligns the footer content */}
        {!token && (
          <div className="py-6 max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-16">
            <div className="mb-6 md:mb-0 gap-5 sm:flex-row sm:justify-center">
              <div className="flex items-center justify-center">
                <img src={footerLogo} className="h-7" alt="Logo" />
              </div>
              <hr className="my-3 w-1/2" />
              <div className="flex items-center justify-center">
                <img src={footerUsa} className="h-20" alt="Logo" />
              </div>
            </div>
            {footerArray.map((item, i) => (
              <div key={i}>
                <h2 className="mb-4 text-xl font-semibold uppercase text-white">
                  {item[0].header}
                </h2>
                <ul className="text-md text-[#BBFCFF]">
                  {item.map((link, j) => (
                    <li key={j} className="mb-4">
                      <Link
                        style={{ color: "#BBFCFF" }}
                        href="#"
                        className="hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className="bg-[#333333] text-white text-center text-sm py-4">
          <div className="max-w-screen-xl mx-auto flex justify-center gap-1">
            <span>All Copyright © 2024</span>
            <div className="text-blue-500">
              <a
                href="https://fafco.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                FAFCO
              </a>
            </div>
            <span>, Inc. - Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
