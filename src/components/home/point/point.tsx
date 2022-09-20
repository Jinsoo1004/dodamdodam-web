import { useState } from "react";
import { FcRules } from "@react-icons/all-files/fc/FcRules";
import usePoint from "../../../hooks/point/usePoint";
import CardTitle from "../../common/cardTitle/cardTitle";
import {
  PointCategoryItemCircle,
  PointCategoryItemWrap,
  PointCategoryWrap,
  PointChangeButton,
  PointContainer,
  PointGraph,
  PointGraphPointText,
  PointGraphWrap,
  PointLeftWrap,
  PointRightWrap,
  PointWrap,
} from "./style";
import PointChartIcon from "../../../assets/icons/point/pointChart.png";

const Point = () => {
  const { schoolPoint, dormitoryPoint } = usePoint();
  const [isDormitoryView, setIsDormitoryView] = useState(true); // true은 기숙사, false은 학교

  return (
    <PointContainer>
      <CardTitle
        title="나의 상벌점 현황"
        titleIcon={PointChartIcon}
        redirectURL={"http://dodam.b1nd.com/dormitory-point"}
      />
      <PointWrap>
        <PointLeftWrap>
          <>
            <PointGraphWrap>
              <PointGraphPointText>
                {isDormitoryView
                  ? dormitoryPoint.dormitoryBonusPoint
                  : schoolPoint.schoolBonusPoint}
                점
              </PointGraphPointText>
              <PointGraph
                point={
                  isDormitoryView
                    ? dormitoryPoint.dormitoryBonusPoint
                    : schoolPoint.schoolBonusPoint
                }
                isBonusPoint={true}
              />
            </PointGraphWrap>
            <PointGraphWrap>
              <PointGraphPointText>
                {isDormitoryView
                  ? dormitoryPoint.dormitoryMinusPoint
                  : schoolPoint.schoolMinusPoint}
                점
              </PointGraphPointText>
              <PointGraph
                point={
                  isDormitoryView
                    ? dormitoryPoint.dormitoryMinusPoint
                    : schoolPoint.schoolMinusPoint
                }
                isBonusPoint={false}
              />
            </PointGraphWrap>
          </>
        </PointLeftWrap>
        <PointRightWrap>
          <PointCategoryWrap>
            <PointCategoryItemWrap>
              <PointCategoryItemCircle style={{ backgroundColor: "#0067bc" }} />
              상점
            </PointCategoryItemWrap>
            <PointCategoryItemWrap>
              <PointCategoryItemCircle style={{ backgroundColor: "#f97e6d" }} />
              벌점
            </PointCategoryItemWrap>
          </PointCategoryWrap>
          <PointChangeButton
            isSchool={isDormitoryView}
            onClick={() => setIsDormitoryView((prev) => !prev)}
          >
            {isDormitoryView ? "기숙사" : "학교"}
          </PointChangeButton>
        </PointRightWrap>
      </PointWrap>
    </PointContainer>
  );
};

export default Point;