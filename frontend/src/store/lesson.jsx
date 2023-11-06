import { csrfFetch } from "./csrf";
const GET_LESSONS = "lessons/getLessons";
const CLEAR_LESSONS = "lessons/clearLessons";
const SET_UNLOCKED = "lessons/setUnlocked";
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
export const setUnlocked = (lesson) => {
  return {
    type: SET_UNLOCKED,
    lesson
  };
}
export const userLessons =()=> async(dispatch)=>{
    const response = await csrfFetch("api/lessons/current");
    // console.log(response,"in the user lessons thunk");
    if(response.ok){
        const data = await response.json();
        // console.log(data,"DATA FROM THUNK")
        dispatch(getLessons(data));
        return data;
    }
}

export const unlockLesson = (lesson) => async (dispatch) => {
  // console.log(lesson,"LESSON From Thunk PUT")
  // console.log('Action to be dispatched:', { type: SET_UNLOCKED, lesson });
  const res = await csrfFetch(`/api/lessons/update`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson),
  });

  if(res.ok) {

    // console.log("res in unlockLesson thunk: ", res);
      const unlockedLilyPad = await res.json()
    // console.log('unlockedLilyPad: ', unlockedLilyPad);

      dispatch(setUnlocked(unlockedLilyPad));
      return unlockedLilyPad;
  } else {
      const errors = await res.json();
      return errors;
  }
};
const initialState = { allLessons: {} };
const lessonReducer = (state = initialState, action) => {

    switch (action.type) {
      case GET_LESSONS: {
         const newState = {...state, allLessons: {}};
        // console.log(action.lessons,"lessons");
        action.lessons.Lessons.forEach((lesson)=>{
            newState.allLessons[lesson.id] = lesson;
        })
        // console.log(newState,"newState");
        return newState;
      };
       
    
      case SET_UNLOCKED: {
        if (action.lesson && action.lesson.id) {
          const newState = {
            ...state,
            allLessons: { [action.lesson.id]: action.lesson },
          };
          return newState;
        }
  
        return state;
      };


      case CLEAR_LESSONS: {
        return initialState;
      }
        

      default: {
        return state;
      }
        
    }
  };
  

  
  export default lessonReducer;
  