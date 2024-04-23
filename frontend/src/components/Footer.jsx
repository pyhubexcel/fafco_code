import { Link } from 'react-router-dom'
import footerLogo from '../assets/img/footer-logo.png'
import footerUsa from '../assets/img/footer-usa.png'

const footerElement = [
  { name: 'Above-Ground Pool Heating' },
  { name: 'In-Ground Pool Heating' },
  { name: 'CoolPV' },
  { name: 'IceStor' },
]
const footerElement2 = [
  { name: 'Pool Heating Basics' },
  { name: 'Technologies' },
  { name: 'Designing a System' },
]
const footerElement3 = [
  { name: 'FAQs' },
  { name: 'Service' },
  { name: 'Downloads' },
  { name: 'Find a Dealer' },
]

export default function Footer() {
  return (
    <footer className="bg-[#005D92]">
      <div className=" w-full  p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-around gap-16">


          <div className="mb-6 md:mb-0 gap-5">
            <div className="flex items-center">
              <img src={footerLogo} className="h-7" alt="Logo" />
            </div>
            <hr className='my-3 w-1/2' />
            <div className="flex items-center">
              <img src={footerUsa} className="h-20" alt="Logo" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-20 ">
            <div>
              <h2 className="mb-6 text-xl font-semibold uppercase text-white">Products</h2>
              <ul className="text-md text-[#BBFCFF]  ">
                {footerElement.map((link, i) => (
                  <li key={i} className="mb-4">
                    <Link style={{ color: "#BBFCFF" }} href="#" className="hover:underline">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>


            <div>
              <h2 className="mb-6 text-xl font-semibold uppercase text-white">Learn</h2>
              <ul className="text-md text-[#BBFCFF] ">
                {footerElement2.map((link, i) => (
                  <li key={i} className="mb-4 text-red-500">
                    <Link style={{ color: "#BBFCFF" }} href="#" className="hover:underline">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>


            <div>
              <h2 className="mb-6 text-xl font-semibold uppercase text-white">Support</h2>
              <ul className="text-md text-[#BBFCFF] ">
                {footerElement3.map((link, i) => (
                  <li key={i} className="mb-4">
                    <Link style={{ color: "#BBFCFF" }} href="#" className="hover:underline">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#333333] text-white text-center py-4'>Copyright © 2024 FAFCO</div>
    </footer>
  )
}
