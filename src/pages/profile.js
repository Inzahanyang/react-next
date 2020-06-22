import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";

export default () => {
  const { me } = useSelector((state) => state.user);
  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList header="FollowingList" data={me && me.Followings} />
      <FollowList header="FollowerList" data={me && me.Followers} />
    </AppLayout>
  );
};
