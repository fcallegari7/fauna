// About.js

import React, { Component } from 'react';

export default class About extends Component {
    render() {
        return (
            <div className="page-wrapper about-wrapper">
                <h2>About</h2>
                <p>You might have heard that Canada is the country of bears. But, they are not the only neighbours we have in Vancouver. Also raccoons, cougars, beavers and coyotes are frequently spotted by people living in the Lower Mainland. Almost every week we have a newspaper reporting a wildlife sighting in Metro Vancouver. Furthermore, Stanley Park Ecology Society reported that more than 1000 coyotes are spotted every year in Vancouver.</p>

                <p>Some people enjoy seeing the wildlife when going outdoor. On the other hand, many other people want to avoid encoutering the same wildlife. Love it or hate it, they have the same problem: They don’t know where the animals are.
                </p>

                <p>
                  That is why we created Fauna, the interactive wildlife locator. Fauna is a web application. But as 60% of internet access comes from smartphones, Fauna is mobile friendly. It takes crowd-sourced, verified information and plots it on top of an interactive map. The interface of the service is quite intuitive because we are using Google Maps API, the most used map in the World. And thanks to our in depth filters, it is very easy to find information relevant to you. Fauna shows you exactly which animal, where and when it was sighted.
                </p>
            </div>
        )
    }
}
