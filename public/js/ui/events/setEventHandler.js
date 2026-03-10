import { bindRatingFilter  } from "../filters/ratingFilterListener.js";
import { bindTagFilter  } from "../filters/tagsFilterListener.js";
import { bindGroupFilter  } from "../filters/groupsFilterListener.js";
import { bindTextFilter  } from "../filters/textFilterListener.js";
import { bindUrlFilter , setfilterFavoriteListener } from "../filters/urlsFilterListener.js";
import { filtersState } from "../filters/filtersState.js";
import { applyFilters } from "../filters/applyFilters.js";


// lien entre evenement avec state + function pour appliquer les filtres
export function setEventHandler() {


  bindRatingFilter({
    filtersState,
    applyFilters
  });
  
  bindTagFilter({
    filtersState,
    applyFilters
  }); 
  
  bindTextFilter({
    filtersState,
    applyFilters
  });

  bindUrlFilter({
    filtersState,
    applyFilters
  });
  
  setfilterFavoriteListener()
  
  bindGroupFilter({
    filtersState,
    applyFilters
  });
  

}
