import React from 'react';

const timelineData = [
  { id: 1, date: 'January - June', title: 'Primaries and Caucuses', description: 'States hold primaries and caucuses to select delegates who will vote for each party\'s presidential nominee at their respective national conventions.' },
  { id: 2, date: 'July - August', title: 'National Conventions', description: 'Parties hold their national conventions to officially nominate their candidates for President and Vice President, and adopt a party platform.' },
  { id: 3, date: 'September - October', title: 'General Election Campaign & Debates', description: 'Candidates campaign nationwide. Presidential and Vice-Presidential debates are held to discuss policies and issues.' },
  { id: 4, date: 'Early November', title: 'Election Day', description: 'Voters cast their ballots. The election is held on the Tuesday next after the first Monday in November.' },
  { id: 5, date: 'Mid-December', title: 'Electoral College Votes', description: 'Electors meet in their respective states and cast their official votes for President and Vice President.' },
  { id: 6, date: 'Early January', title: 'Counting Electoral Votes', description: 'Congress meets in a joint session to count the electoral votes and officially declare the winner of the election.' },
  { id: 7, date: 'January 20', title: 'Inauguration Day', description: 'The President-elect and Vice President-elect take the Oath of Office and are inaugurated.' }
];

export const Timeline = () => {
  return (
    <section className="timeline-section fade-in" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="mb-4 text-center">US Election Timeline</h2>
      <div className="timeline-container" role="list">
        {timelineData.map((item) => (
          <div key={item.id} className="timeline-item" role="listitem">
            <div className="timeline-dot" aria-hidden="true"></div>
            <div className="timeline-content">
              <span className="timeline-date">{item.date}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
