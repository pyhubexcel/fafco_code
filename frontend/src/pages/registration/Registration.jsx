import { Button, CheckBox, DropDownBox } from 'devextreme-react';
import CustomInput from "../../components/CustomInput";
import Header from '../../components/Header';

const inputData = [
    {
        placeHolder: "First Name",
    },
    {
        placeHolder: "Last Name",
    },
    {
        placeHolder: "Email",
    },
    {
        placeHolder: "Phone",
    },
    {
        placeHolder: "Install Date",
    },
]

export default function Registration() {
    return (
        <div className="w-10/12 m-auto h-screen py-2">
            <div className="space-y-6">
                <Header />
                <div className="flex gap-5 w-1/2 ">
                    <div className="w-1/2">
                        <DropDownBox></DropDownBox>
                    </div>
                    <div className="w-1/2">
                        <Button
                            text="Use this address"
                            stylingMode="contained"
                            type="default"
                        />
                    </div>
                </div>
                <div className=" border-2 border-gray-300 ">
                    <div className=" space-y-3 px-3 py-5">
                        {inputData.map((item, i) => (
                            <div key={i} className='flex gap-3'>
                                <CustomInput placeHolder={item.placeHolder} />
                                {item.placeHolder === "Email" || item.placeHolder === "Phone" ? <i>*Optional</i> : null}
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" border-2 border-gray-300 flex px-3 py-5 gap-4">
                    <div className="w-3/6 space-y-3 ">
                        <div className="flex gap-4 ">
                            <div className='w-1/2'>
                                <CustomInput placeHolder='Part Dropdown' />
                            </div>
                            <div className="flex gap-4 w-1/2">
                                <CustomInput placeHolder='# of Panels' />
                                <CustomInput placeHolder='Add' />
                            </div>
                        </div>
                        <div>
                            <CustomInput placeHolder='Upload POP' className="w-1/2" />
                        </div>
                        <div className="w-full bg-[#D9D9D9] h-24 p-4">Upload(s) List</div>
                        <div>
                            <CheckBox
                                text="Medallion?"
                                hint="Medallion?"
                                iconSize="25" />
                        </div>
                    </div>
                    <div className="w-full bg-[#D9D9D9] p-4">System Parts Grid</div>
                </div>
            </div>
        </div>
    )
}
