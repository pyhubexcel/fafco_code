import DealerHome from "../../components/DealerHome";
import HomeOwner from "../../components/HomeOwner";
import Cookies from 'js-cookie';

export default function Home() {
    const role = Cookies.get('role')
    return (
        <div>
            {role == 1 ? <DealerHome /> : <HomeOwner />}
        </div>
    )
}
