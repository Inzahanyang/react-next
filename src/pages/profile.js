import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

export default () => {
  const followerList = [
    { nickname: "Inzahan" },
    { nickname: "Yangwoo" },
    { nickname: "Jiny" },
  ];
  const followingList = [
    { nickname: "Inzahan" },
    { nickname: "Yangwoo" },
    { nickname: "Jiny" },
  ];
  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList header="FollowingList" data={followingList} />
      <FollowList header="FollowerList" data={followerList} />
    </AppLayout>
  );
};
