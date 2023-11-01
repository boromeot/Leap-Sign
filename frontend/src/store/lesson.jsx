import { csrfFetch } from "./csrf";
const GET_LESSONS = "lessons/getLessons";
const getLessons = (lessons)=>{
return {
    type:GET_LESSONS,
    payload : lessons
}
}

export const userLessons =()=> async(dispatch)=>{
    const response = await csrfFetch("api/lessons/current");
    console.log(response,"in the user lessons thunk")
    if(response.ok){
        const data = await response.json();
        console.log(data,"DATA FROM THUNK")
        dispatch(getLessons(data));
        return data;
    }
}
const initialState = { lessons: {} };
const lessonReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case GET_LESSONS:
        newState = Object.assign({}, state);
        console.log(action.lessons,"lessons");
        action.payload.Lessons.forEach((lesson)=>{
            newState.lessons[lesson.id] = lesson;
        })
        console.log(newState,"newState");
        return newState;
      default:
        return state;
    }
  };
  

  
  export default lessonReducer;
  