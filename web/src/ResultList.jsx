export default function ResultList({ items = [], loading }) {
  const listItems = items.map(i =>
    <li key={i.id}>
      {i.title}
    </li>
  );

  return (
    <div id="resultlist">
      {loading ? (
        <div>Loading...</div>
      ) :
        listItems
      }
    </div>
  );
}
