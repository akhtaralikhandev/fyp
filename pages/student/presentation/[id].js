import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ViewPresentationComp from "../../../components/student/presentation/presentation1";
const SinglePresentationPage = () => {
  const myProject = useSelector((state) => state.student?.projects);
  const presentations = myProject?.Presentation_Scedule;
  console.log(presentations);

  const router = useRouter();
  const { id } = router.query;
  const thisPresentation = presentations?.filter((x) => x?.id === parseInt(id));
  const data = thisPresentation[0];
  console.log(thisPresentation);
  console.log(id);

  return (
    <div>
      <ViewPresentationComp data={data} />
    </div>
  );
};
export default SinglePresentationPage;
