import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";

export default () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList header="FollowingList" data={me && me.Followings} />
      <FollowList header="FollowerList" data={me && me.Followers} />
    </AppLayout>
  );
};
