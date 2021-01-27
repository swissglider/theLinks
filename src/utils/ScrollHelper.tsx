const getCurrentActionValueWithScrollBoundary = (
    scrollPosition: number,
    scrollPositionStart: number,
    scrollPositionStop: number,
    actionStartValue: number,
    actionStopValue: number,
): number => {
    const actionDirection = actionStartValue < actionStopValue ? 1 : -1;
    const actionStepRange =
        actionDirection === 1 ? actionStopValue - actionStartValue : actionStartValue - actionStopValue;
    const scrollDirection = scrollPositionStart < scrollPositionStop ? 1 : -1;
    const scrollStepRange =
        scrollDirection === 1 ? scrollPositionStop - scrollPositionStart : scrollPositionStart - scrollPositionStop;
    // const scrollStepSize = 1; // in relation with ScrollStep
    const actionStepSize = actionStepRange / scrollStepRange;
    const currentScrollStep =
        scrollDirection === 1 ? scrollPosition - scrollPositionStart : scrollPositionStart - scrollPosition;

    // console.log({
    //     scrollPosition: scrollPosition,
    //     scrollPositionStart: scrollPositionStart,
    //     scrollPositionStop: scrollPositionStop,
    //     actionStartValue: actionStartValue,
    //     actionStopValue: actionStopValue,
    //     actionDirection: actionDirection,
    //     actionStepRange: actionStepRange,
    //     scrollDirection: scrollDirection,
    //     scrollStepRange: scrollStepRange,
    //     actionStepSize: actionStepSize,
    //     currentScrollStep: currentScrollStep,
    // });

    const currentActionPosition =
        scrollDirection === 1
            ? scrollPosition < scrollPositionStart
                ? actionStartValue
                : !(scrollPosition > scrollPositionStop)
                ? actionStartValue + actionStepSize * currentScrollStep * actionDirection
                : actionStopValue
            : scrollPosition > scrollPositionStart
            ? actionStartValue
            : !(scrollPosition < scrollPositionStop)
            ? actionStartValue + actionStepSize * currentScrollStep * actionDirection
            : actionStopValue;
    // console.log(currentActionPosition);
    return currentActionPosition;
};

const getCurrentActionValueWithValueBoundaryAndScrollSetpRange = (
    scrollPosition: number,
    scrollPositionStart: number,
    actionStartValue: number,
    actionStopValue: number,
    scrollStepRange: number,
    scrollDirection?: 1 | -1,
): number => {
    scrollDirection = scrollDirection !== undefined ? scrollDirection : 1;
    const scrollPostionStop =
        scrollDirection === 1 ? scrollPositionStart + scrollStepRange : scrollPositionStart - scrollStepRange;
    return getCurrentActionValueWithScrollBoundary(
        scrollPosition,
        scrollPositionStart,
        scrollPostionStop,
        actionStartValue,
        actionStopValue,
    );
};

const ScrollHelper = {
    getCurrentActionValueWithScrollBoundary: getCurrentActionValueWithScrollBoundary,
    getCurrentActionValueWithValueBoundaryAndScrollSetpRange: getCurrentActionValueWithValueBoundaryAndScrollSetpRange,
};

export default ScrollHelper;
