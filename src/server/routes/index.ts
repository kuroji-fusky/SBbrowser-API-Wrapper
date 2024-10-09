import { rootRoute } from "./root";
import { useridRoute } from "./userid";
import { usernameRoute } from "./username";
import { uuidRoute } from "./uuid";
import { videoRoute } from "./video";
import { vipUsersRoute } from "./vipUsers";

const routes = {
  root: rootRoute,
  uuid: uuidRoute,
  userid: useridRoute,
  username: usernameRoute,
  video: videoRoute,
  vipUsers: vipUsersRoute,
};

export default routes;
