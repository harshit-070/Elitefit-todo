**Question: - How long did you spend on the coding test?**

Following is approx break of time taken.

Layout Preparing: 30 min
UI Coding: 2.5 hours
Functionality: 2.5 hours
Markup file: 1 hour
***

**Question: - What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.**

In React 18, they have introduced useTransition hooks that help us update the search field faster, but update the filtered task list later

In Task.js, defining useTransition

`
  const [isPending, startTransition] = useTransition();
`

```
    const handleSearchChange = (e) => {
    setSearch(e.target.value.trim());
    startTransition(() => {
      setFilteredList((prevFilteredList) => {
        // Filtering the list based on search, for filtering please see code in Tab.js
      });
    });
  };
```

If the result is still pending then rending the circular progress bar for feedback.

```
{isPending ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : (
        <RenderList/>
      )
}
```
***
**Question:- How would you track down a performance issue in production? Have you ever had to do this?**
Yes, I have experience tracking down and resolving performance issues, often involving backend server optimization and improving rendering efficiency in React applications.

For troubleshooting performance issues in production.
Firstly, I employ monitoring tools to pinpoint the specific area causing the problem.
Incase of react I am using the react developer tools to find out about the componenet rending at each stage,

![](src/assets/React%20Profiler.png)

 If it is more then expexted than a thorough code review is conducted to identify inefficient algorithms or resource-intensive operations. Optimization phase involves making necessary adjustments, such as using memorization, minimizing re-renders,

***
**Question:- If you had more time, what additional features or improvements would you consider adding to the task management application?**

If I had more time, I would gamify the task completion, which will increase user productivity and the website's footfall.
We can also add the functionality to categorize the task, which helps the user to organize the list correctly.
The data is stored locally, but we can move it to the cloud to ensure data synchronization across multiple devices. Following is approx break of time taken.
