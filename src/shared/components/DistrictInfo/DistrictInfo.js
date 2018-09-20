import React, {PureComponent} from 'react';

export default class DistrictInfo extends PureComponent {


  renderFacilityStats(facilityStats) {
    return (
      <div className="facilityStats">
        <p className="statsHeader">Whistles by Facility Type</p>
        <p className="statsEntry">Hospitals: {facilityStats.hospital}</p>
        <p className="statsEntry">Extended Care Facilities: {facilityStats.extended_care}</p>
        <p className="statsEntry">Long-term Care Facilities: {facilityStats.long_term_care}</p>
      </div>
    )
  }

  renderTypeStats(typeStats) {
    return (
      <div className="typeStats">
        <p className="statsHeader">Whistles by Reporter Type</p>
        <p className="statsEntry">RN: {typeStats.rn}</p>
        <p className="statsEntry">LPN: {typeStats.lpn}</p>
        <p className="statsEntry">CNA: {typeStats.cna}</p>
        <p className="statsEntry">Other: {typeStats.other}</p>
      </div>
    )
  }

  renderStatsBlock(stats) {
    if (!stats || stats === 'null') return <p className="whistleTotals">No recorded whistles.</p>;

    if (typeof stats === "string") {
      stats = JSON.parse(stats);
    }
    if (!stats.facility_type || !stats.type) return null;

    return (
      <div className="statsBlock">
        <p className="whistleTotals">{stats.type.total} Whistle{stats.type.total > 1 && "s"}</p>
        { stats.facility_type && this.renderFacilityStats(stats.facility_type) }
        { stats.type && this.renderTypeStats(stats.type) }
      </div>
    )
  }

  renderFacebook(social) {
    const link = `https://www.facebook.com/${social.id}`;
    return <a key={`${social.type}_${social.id}`} href={link} target="_blank"><img className="socialIcon" src="/images/facebook_logo.png" alt="Facebook link"/></a>
  }

  renderYouTube(social) {
    const link = `https://www.youtube.com/user/${social.id}`;
    return <a key={`${social.type}_${social.id}`} href={link} target="_blank"><img className="socialIcon" src="/images/youtube_logo.png" alt="YouTube link"/></a>
  }

  renderTwitter(social) {
    const link = `https://twitter.com/${social.id}`;
    return <a key={`${social.type}_${social.id}`} href={link} target="_blank"><img className="socialIcon" src="/images/twitter_logo.png" alt="Twitter link"/></a>
  }

  renderSocialBlock(social) {
    if (!social) return;

    if (typeof social === "string") {
      social = JSON.parse(social);
    }
    return (
      <div className="social-block">
        { social.map(s => {
          if (s.type === 'Facebook') return this.renderFacebook(s);
          else if (s.type === 'YouTube') return this.renderYouTube(s);
          else if (s.type === 'Twitter') return this.renderTwitter(s);
          else return null;
        })}
      </div>
    )
  }

  renderStateDistrictHeader(state, district) {
    if (district === '00') return <p>{state} - At Large</p>
    else return <p>{state} - {district}</p>
  }

  render() {
    const {info} = this.props;
    const properties = info.properties;
    console.log(properties)

    return (
      <div className="districtInfo">
        <div className="header">
          { this.renderStateDistrictHeader(properties.stateAbbr, properties.NAME) }
          { properties.url &&
            <p>Representative: <a href={properties.url} target="_blank">{properties.rep}</a></p>
          }
          { !properties.url &&
            <p>Representative: {properties.rep}</p>
          }
        </div>
        { this.renderStatsBlock(properties.stats) }
        { this.renderSocialBlock(properties.social) }
      </div>
    );
  }
}
