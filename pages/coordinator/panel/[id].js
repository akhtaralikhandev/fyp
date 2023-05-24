import SinglePanelComp from "../../../components/coordinator/panels/singlePanel/singlePanel";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const SinglePanel = () => {
  const allPanels = useSelector((state) => state.panel.panel);
  const router = useRouter();
  console.log(router);
  const id = parseInt(router.query?.id);
  console.log("this is id");
  console.log(id);
  const panel = allPanels.filter((x) => x.id === id);
  console.log("panel 2 ");
  const panel2 = panel[0];
  console.log(panel);
  return (
    <div>
      <SinglePanelComp panel={panel2} />
    </div>
  );
};
export default SinglePanel;
