import "./resultlist.scss";
import GameCard from './GameCard.jsx';

export default function ResultList({ items = [], loading, error }) {
  const listItems = items.map(i =>
    <GameCard g={i} key={i.id} />
  );

  return (
    <>
      <div id="resultcount">
        {!loading ? <>Results found: <b>{items.length}</b></> : "" }
      </div>
      <div id="resultlist">
        { error ? error : ""}
        {loading ? (
          <div><b>Loading...</b></div>
        ) :
          listItems
        }
      </div>
    </>
  );
}
