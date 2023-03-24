import React from 'react';

const SocialMediaIcons = () => {
  return (
    <div className='social'>
      <a href="#">
        <img src={require("../assets/img/logo_calendar.png")} alt="instagram" />
      </a>
      <a href="#">
        <img src={require("../assets/img/logo_calendar.png")} alt="facebook" />
      </a>
      <a href="#">
        <img src={require("../assets/img/logo_calendar.png")} alt="Linkd in" />
      </a>
      <a href="#">
        <img src={require("../assets/img/logo_calendar.png")} alt="youtube" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;