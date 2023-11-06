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
    if(response.ok){
        const data = await response.json();
        dispatch(getLessons(data));
        return data;
    }
}

export const unlockLesson = (lesson) => async (dispatch) => {
  const res = await csrfFetch(`/api/lessons/update`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson),
  });

  if(res.ok) {

      const unlockedLilyPad = await res.json()

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
        action.lessons.Lessons.forEach((lesson)=>{
            newState.allLessons[lesson.id] = lesson;
        })
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
  