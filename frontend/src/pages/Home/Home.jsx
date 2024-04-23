import DealerHome from "../../components/DealerHome";
import HomeOwner from "../../components/HomeOwner";
import cookie from 'react-cookies'

export default function Home() {
    const role = cookie.load("role");
    return (
        <div>
            {role == 1 ? <DealerHome /> : <HomeOwner />}
        </div>
    )
}
