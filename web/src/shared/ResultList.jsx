import "./resultlist.scss";
import favIcon from "../assets/fav.svg";

const region = {
  gl: "GLOBAL",
  eu: "EUROPE"
};
const platform = {
  xb: "Xbox Live",
  ea: "EA App",
  rs: "Rockstar Games Launcher",
  gg: "Green Gift",
  sw: "Nintendo"
};

function GameCard({ g }) {
  return (
    <div className={"gamecard no-select" + (g.cashback ? " cashback" : "")}>
      <div className="cover">
        <img src={"/static/covers/" + g.cover}></img>
      </div>
      <div className="details">
        <div className="platform">
          <img src={"/static/logos/" + g.platform + ".svg"}></img>
          <span className="text">{platform[g.platform]}</span>
        </div>
        <p className="title">
          {g.title}
        </p>
        <p className="region">
          {region[g.region]}
        </p>
        <p className="price">
          {"From" + (g.discount ? (` €${Number(g.price).toFixed(2)}`) : "")}
          {g.discount ? <span className="green"> -{g.discount}%</span> : null}
        </p>
        <p className="dprice">
          {`€${g.dprice ? Number(g.dprice).toFixed(2) : Number(g.price).toFixed(2)}`}
        </p>
        <p className="cashback green">
          {g.cashback ? `Cashback: €${Number(g.cashback).toFixed(2)}` : ""}
        </p>
        <p className="favcount">
          <img src={favIcon}></img>
          {g.favcount}
        </p>
      </div>
    </div>
  );
}

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
          <div>Loading...</div>
        ) :
          listItems
        }
      </div>
    </>
  );
}
