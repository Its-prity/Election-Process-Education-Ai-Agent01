import React from 'react';

const timelineData = [
  { id: 1, date: 'Pre-Election', title: 'Announcement of Schedule', description: 'The Election Commission of India (ECI) announces the dates for polling and counting of votes, bringing the Model Code of Conduct into effect.' },
  { id: 2, date: 'Phase 1', title: 'Filing of Nominations', description: 'Candidates file their nomination papers with the Returning Officer. After scrutiny, candidates have a window to withdraw their names.' },
  { id: 3, date: 'Phase 2', title: 'Campaigning', description: 'Political parties release manifestos and hold rallies. Campaigning officially ends 48 hours before the polling day.' },
  { id: 4, date: 'Phase 3', title: 'Polling Days', description: 'Due to the large population, voting is held in multiple phases across different states using Electronic Voting Machines (EVMs).' },
  { id: 5, date: 'Phase 4', title: 'Counting of Votes', description: 'Votes are counted on a single designated day under the supervision of the ECI, and results are declared.' },
  { id: 6, date: 'Post-Election', title: 'Formation of Government', description: 'The President of India invites the leader of the party or coalition with a majority in the Lok Sabha to form the government.' }
];

export const Timeline = () => {
  return (
    <section className="timeline-section fade-in" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="mb-4 text-center">Indian Election Timeline</h2>
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
