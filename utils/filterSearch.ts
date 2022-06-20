import { NextRouter } from "next/router";

const filterSearch = ({
    router,
    page,
    
}: {
    router: NextRouter;
    page: any;
    
}) => {
    const path = router.pathname;
    const query = router.query;

    if (page) query.page = page;


    router.push({
        pathname: path,
        query: query,
    });
};

export default filterSearch;
