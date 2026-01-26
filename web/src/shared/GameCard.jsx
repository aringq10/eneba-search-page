import FavIcon from "../assets/fav.svg?react";
import CartIcon from "../assets/cart.svg?react";
import PlusIcon from "../assets/plus.svg?react";
import RibbonIcon from "../assets/ribbon.svg?react";
import CashbackIcon from "../assets/cashback.svg?react";
import "./gamecard.scss";

const regionColor = ["red", "cyan"];
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

export default function GameCard({ g }) {
  return (
    <div className={"gamecard no-select" + (g.cashback ? " cashback" : "")}>
      <div className="cover">
        <img src={"/covers/" + g.cover}></img>
        <div className="cover-overlay"></div>
      </div>
      <div className="detBtnWrapper">
        <div className="details">
          {g.cashback ? (
            <div className="cashbackRibbon">
              <CashbackIcon className="cashbackIcon" />
              <div className="desktop">CASHBACK</div>
            </div>
          ) : null}
          <div className="platform">
            <img src={"/logos/" + g.platform + ".svg"}></img>
            <span className="lineclamp1">{platform[g.platform]}</span>
          </div>
          <div className="title-region-wrapper">
            <div className="title lineclamp2">
              {g.title}
            </div>
            <div className={"region lineclamp1 " + regionColor[Math.floor(Math.random() * 2)]}>
              {region[g.region]}
            </div>
          </div>
          <div className="price lineclamp1">
            {"From"}
            {g.discount ? (
              <>
                {" €"}
                <s>{Number(g.price).toFixed(2)}</s>
                <span className="green"> -{g.discount}%</span>
              </>
            ) : null }
          </div>
          <div className="dprice lineclamp1">
            {'€'}
            {g.dprice ? (
              Number(g.dprice).toFixed(2)
            ) : (
                Number(g.price).toFixed(2)
              )}
          </div>
          <div className="cashback green lineclamp1">
            {g.cashback ? (
              <>
                {'Cashback: €'}
                {Number(g.cashback).toFixed(2)}
              </>
            ) : null}
          </div>
          <div className="favcount lineclamp1">
            <FavIcon className="favIcon" />
            {g.favcount}
          </div>
        </div>
        <div className="buttons">
          <div className="cartbtn">
            <span className="desktop">Add to cart</span>
            <PlusIcon className="mobile plusIcon" />
            <CartIcon className="mobile cartIcon" />
          </div>
          <div className="optbtn">Explore options</div>
        </div>
      </div>
      <div className="favbtn">
        <RibbonIcon className="ribbonIcon" />
      </div>
    </div>
  );
}
