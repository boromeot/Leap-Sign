import { csrfFetch } from "./csrf";
const GET_LESSONS = "lessons/getLessons";
const CLEAR_LESSONS = "lessons/clearLessons";

const getLessons = (lessons)=>{
return {
    type:GET_LESSONS,
    lessons,
}
}

export const clearLessons = () => {
  return {
    type: CLEAR_LESSONS,
  };
};

export const userLessons =()=> async(dispatch)=>{
    const response = await csrfFetch("api/lessons/current");
    console.log(response,"in the user lessons thunk");
    if(response.ok){
        const data = await response.json();
        console.log(data,"DATA FROM THUNK")
        dispatch(getLessons(data));
        return data;
    }
}
const initialState = { allLessons: {} };
const lessonReducer = (state = initialState, action) => {

    switch (action.type) {
      case GET_LESSONS:
        const newState = {...state, allLessons: {}};
        // console.log(action.lessons,"lessons");
        action.lessons.Lessons.forEach((lesson)=>{
            newState.allLessons[lesson.id] = lesson;
        })
        // console.log(newState,"newState");
        return newState;

      case CLEAR_LESSONS:
        return initialState;

      default:
        return state;
    }
  };
  

  
  export default lessonReducer;
  