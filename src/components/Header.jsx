export default function Header() {
  return (
    <header className='flex justify-between items-center mb-4'>
      <h1 className='text-xl font-bold'>독일 생활 표현 사전</h1>
      <div>
        <button onClick={() => setPage('favorites')}>즐겨찾기</button>
      </div>
    </header>
  );
}
