import React, { Component } from 'react';
const Fabio = require('../images/Fabio.png');
const Gustavo = require('../images/Gustavo.png');
const Yar = require('../images/Yar.png');
const Monika = require('../images/Monika.png');
const Grible = require('../images/Grible.png');

export default class About extends Component {
    render() {
        return (
            <div className="page-wrapper about-wrapper">
                <h2>About</h2>

                <div className="video">
                  <iframe title="About the project" src="https://www.youtube.com/embed/_--S0agRqL8" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>

                <h3>The Project</h3>
                <p>You may have heard that Canada is the country of bears. But, they are not the only neighbours we have in Vancouver. Also raccoons, cougars, beavers and coyotes are frequently spotted by people living in the Lower Mainland. Almost every week we have a newspaper reporting a wildlife sighting in Metro Vancouver. Furthermore, Stanley Park Ecology Society reported that more than 1000 coyotes are spotted every year in Vancouver.</p>

                <p>Some people enjoy seeing the wildlife when going outdoor. On the other hand, many other people want to avoid encountering the same wildlife. Love it or hate it, they have the same problem: They don’t know where the animals are.
                </p>

                <p>
                That is why we created Fauna, the interactive wildlife locator. Fauna is a web application. But as 60% of internet access comes from smartphones, Fauna is mobile friendly. It takes crowd-sourced, verified information and plots it on top of an interactive map. The interface of the service is quite intuitive because we are using Google Maps API, the most used map in the World. And thanks to our in depth filters, it is very easy to find information relevant to you. Fauna shows you exactly which animal, where and when it was sighted.
                </p>

                <h3>The Team</h3>
                <p>All of that would not be possible without our phenomenal and diverse team of creative, efficient and experienced people. Each of us is specialized in a specific subject, and together we could achieve so much more.</p>

                <div className='team'>
                  <div className='team-member'>
                    <a href='https://www.linkedin.com/in/fabio-callegari7/' target='_blank' rel="noopener noreferrer">
                      <img className='profile' src={Fabio} alt="Fabio Callegari"/>
                      <h4>Fabio Callegari</h4>
                      <p>Team Leader</p>
                    </a>
                  </div>

                  <div className='team-member'>
                    <a href='https://www.linkedin.com/in/gustavoteixeiragomes/' target='_blank' rel="noopener noreferrer">
                      <img className='profile' src={Gustavo} alt="Gustavo Gomes"/>
                      <h4>Gustavo Gomes</h4>
                      <p>Lead Developer</p>
                    </a>
                  </div>

                  <div className='team-member'>
                    <a href='https://www.linkedin.com/in/yaroslavkostiukov/' target='_blank' rel="noopener noreferrer">
                      <img className='profile' src={Yar} alt="Yaroslav Kostiukov"/>
                      <h4>Yaroslav Kostiukov</h4>
                      <p>Lead Designer</p>
                    </a>
                  </div>

                  <div className='team-member'>
                    <a href='https://www.linkedin.com/in/monika-sharma-427625b8/' target='_blank' rel="noopener noreferrer">
                      <img className='profile' src={Monika} alt="Monika Sharma"/>
                      <h4>Monika Sharma</h4>
                      <p>UX Designer</p>
                    </a>
                  </div>

                  <div className='team-member'>
                    <a href='https://www.linkedin.com/in/grible-shaji-160557158/' target='_blank' rel="noopener noreferrer">
                      <img className='profile' src={Grible} alt="Grible Shaji"/>
                      <h4>Grible Shaji</h4>
                      <p>UI Designer</p>
                    </a>
                  </div>

                </div>


            </div>
        )
    }
}
