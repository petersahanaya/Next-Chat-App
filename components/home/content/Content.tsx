import Search from '@/components/input/Search'
import Card from '../card/Card'
import Category from '../category/Category'

const Content = () => {
    return (
        <>
            <main className="w-screen h-screen bg-stone-900">
                <Search/>
                <Category/>
                <Card/>
            </main>
        </>
    )
}

export default Content