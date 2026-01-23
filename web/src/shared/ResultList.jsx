export default function ResultList({ items = [], loading, error }) {
  const listItems = items.map(i =>
    <div key={i.id} className="gamecard">
      <div className="gametitle">{i.title}</div>
      <div className="gameprice">{i.price}</div>
      <div className="gameplatform">{i.platform}</div>
    </div>
  );

  return (
    <>
      <div id="resultcount">
        {!loading ? <>Results found: <b>{items.length}</b></> : "" }
      </div>
      <div id="resultlist">
        { error ? error : ""}
        {loading ? (
          <div>Loading...</div>
        ) :
          listItems
        }
      </div>
    </>
  );
}
